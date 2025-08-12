const fs = require('fs');

function readJson(path) {
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

function safeReadJson(path, fallback = null) {
  try { return readJson(path); } catch { return fallback; }
}

function main() {
  const coursesPath = './courses_database.json';
  const courses = readJson(coursesPath);
  if (!Array.isArray(courses) || courses.length === 0) {
    throw new Error('No courses found in courses_database.json');
  }

  // Use the first (or only) course present
  const course = courses[0];

  // Ensure published and visible
  course.isPublished = true;
  course.visibility = 'public';

  // SCORM packages and launch files from metadata
  const scormBase = './uploads/scorm';
  const pkgMeta = (name) => safeReadJson(`${scormBase}/${name}/.openlms.json`, {});

  const introMeta = pkgMeta('Intro');
  const contentMeta = pkgMeta('Content');
  const practiceMeta = pkgMeta('Practice1');

  // Build launch URLs (fallbacks if metadata missing)
  const url = (name, launchFile) => `/public/scorm/${name}/${launchFile || 'index.html'}`;

  const modules = [
    {
      id: 'module-1',
      title: 'Module 1: Introduction',
      scormId: 'Intro',
      launchUrl: url('Intro', introMeta.launchFile || 'index_lms.html'),
      order: 1,
      isRequired: true,
      enforceSequence: true,
      prerequisites: []
    },
    {
      id: 'module-2',
      title: 'Module 2: Content',
      scormId: 'Content',
      launchUrl: url('Content', contentMeta.launchFile || 'index.html'),
      order: 2,
      isRequired: true,
      enforceSequence: true,
      prerequisites: ['module-1']
    },
    {
      id: 'module-3',
      title: 'Module 3: Practice 1',
      scormId: 'Practice1',
      launchUrl: url('Practice1', practiceMeta.launchFile || 'index.html'),
      order: 3,
      isRequired: true,
      enforceSequence: true,
      prerequisites: ['module-2']
    }
  ];

  // Attach modules to course metadata
  course.modules = modules;

  // Optionally set a simple catalog/enrollment flag block
  course.catalog = { listed: true, allowSelfEnrollment: true };

  // Write back
  fs.writeFileSync(coursesPath, JSON.stringify(courses, null, 2));

  // Also emit a standalone structure file for clarity
  const structure = {
    courseId: course.id,
    title: course.title,
    published: course.isPublished,
    visibility: course.visibility,
    modules
  };
  fs.writeFileSync('./course_modules_powerpoint.json', JSON.stringify(structure, null, 2));

  console.log('SCORM modules associated successfully.');
  console.log('Updated courses_database.json and created course_modules_powerpoint.json');
}

main();

