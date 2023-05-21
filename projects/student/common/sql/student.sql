USE student;

CREATE TABLE student_info (
  ID INT KEY AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL UNIQUE,
  chinese INT NOT NULL,
  english INT NOT NULL,
  math INT NOT NULL
)