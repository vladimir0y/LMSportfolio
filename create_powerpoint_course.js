const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');

async function createPowerPointCourse() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('./lms_courses.db');
    console.log('Connected to SQLite database successfully');

    // Create courses table if it doesn't exist
    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS courses (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          isPublished INTEGER DEFAULT 1,
          createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
          updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          console.error('Error creating table:', err);
          reject(err);
          return;
        }
        console.log('Courses table ready');
      });

      // Insert the PowerPoint software simulator course
      const courseId = uuidv4();
      const now = new Date().toISOString();
      
      db.run(`
        INSERT INTO courses (id, title, description, isPublished, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [
        courseId,
        'PowerPoint software simulator',
        'Interactive simulator covering PowerPoint fundamentals with guided practice.',
        1,  // SQLite uses 1 for true
        now,
        now
      ], function(err) {
        if (err) {
          console.error('Error inserting course:', err);
          reject(err);
          return;
        }

        // Get the created course
        db.get(`
          SELECT id, title, description, isPublished, createdAt, updatedAt
          FROM courses WHERE id = ?
        `, [courseId], (err, row) => {
          if (err) {
            reject(err);
            return;
          }

          console.log('\n=== COURSE CREATED SUCCESSFULLY ===');
          console.log('Course ID:', row.id);
          console.log('Title:', row.title);
          console.log('Description:', row.description);
          console.log('Published:', row.isPublished === 1);
          console.log('Created At:', row.createdAt);
          console.log('Updated At:', row.updatedAt);
          console.log('===================================');

          // Also list all courses to verify
          db.all('SELECT id, title, description FROM courses ORDER BY createdAt DESC', (err, rows) => {
            if (err) {
              reject(err);
              return;
            }

            console.log('\nAll courses in the system:');
            rows.forEach((course, index) => {
              console.log(`${index + 1}. [${course.id}] ${course.title}`);
              if (course.description) {
                console.log(`   Description: ${course.description}`);
              }
            });

            db.close((err) => {
              if (err) {
                console.error('Error closing database:', err);
              } else {
                console.log('\nDatabase connection closed');
              }
              resolve(row);
            });
          });
        });
      });
    });
  });
}

// Run the script
createPowerPointCourse()
  .then(course => {
    console.log(`\n✓ PowerPoint software simulator course created with ID: ${course.id}`);
    process.exit(0);
  })
  .catch(error => {
    console.error('✗ Failed to create course:', error.message);
    process.exit(1);
  });
