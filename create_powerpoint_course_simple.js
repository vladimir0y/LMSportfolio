const fs = require('fs');
const crypto = require('crypto');

// Generate a UUID-like ID
function generateId() {
  return crypto.randomBytes(16).toString('hex').replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
}

async function createPowerPointCourse() {
  const courseId = generateId();
  const now = new Date().toISOString();
  
  const courseData = {
    id: courseId,
    title: 'PowerPoint software simulator',
    description: 'Interactive simulator covering PowerPoint fundamentals with guided practice.',
    isPublished: true,
    category: 'Software Training', // Category per project standards
    visibility: 'public', // Visibility per project standards
    createdAt: now,
    updatedAt: now,
    metadata: {
      type: 'simulator',
      subject: 'PowerPoint',
      level: 'beginner-intermediate',
      estimatedDuration: '2-3 hours',
      features: [
        'Interactive practice',
        'Guided tutorials',
        'Real-time feedback',
        'Progress tracking'
      ]
    }
  };

  // Read existing courses or create new file
  let courses = [];
  const coursesFile = './courses_database.json';
  
  try {
    if (fs.existsSync(coursesFile)) {
      const existingData = fs.readFileSync(coursesFile, 'utf8');
      courses = JSON.parse(existingData);
      console.log(`Loaded ${courses.length} existing courses`);
    } else {
      console.log('Creating new courses database');
    }
  } catch (error) {
    console.log('Creating new courses database (error reading existing):', error.message);
    courses = [];
  }

  // Add the new course
  courses.push(courseData);

  // Save to file
  fs.writeFileSync(coursesFile, JSON.stringify(courses, null, 2));

  console.log('\n=== COURSE CREATED SUCCESSFULLY ===');
  console.log('Course ID:', courseData.id);
  console.log('Title:', courseData.title);
  console.log('Description:', courseData.description);
  console.log('Published:', courseData.isPublished);
  console.log('Category:', courseData.category);
  console.log('Visibility:', courseData.visibility);
  console.log('Created At:', courseData.createdAt);
  console.log('Updated At:', courseData.updatedAt);
  console.log('===================================');

  console.log('\nCourse Features:');
  courseData.metadata.features.forEach((feature, index) => {
    console.log(`  ${index + 1}. ${feature}`);
  });

  // List all courses
  console.log(`\nAll courses in the system (${courses.length} total):`);
  courses.forEach((course, index) => {
    console.log(`${index + 1}. [${course.id}] ${course.title}`);
    if (course.description) {
      console.log(`   Description: ${course.description}`);
    }
    if (course.category) {
      console.log(`   Category: ${course.category}`);
    }
  });

  console.log(`\nCourse data saved to: ${coursesFile}`);
  
  return courseData;
}

// Run the script
createPowerPointCourse()
  .then(course => {
    console.log(`\n✓ PowerPoint software simulator course created successfully!`);
    console.log(`✓ Course ID for future reference: ${course.id}`);
    console.log(`✓ Course record saved to courses_database.json`);
    process.exit(0);
  })
  .catch(error => {
    console.error('✗ Failed to create course:', error.message);
    process.exit(1);
  });
