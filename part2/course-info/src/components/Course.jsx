function Course({ course }) {
  return (
    <>
      <Header text={course.name} />
      <Content content={course.parts} />
      <Total course={course} />
    </>
  );
}

function Header({ text }) {
  return <h2>{text}</h2>;
}

function Content({ content }) {
  return content.map((part) => <Part key={part.id} part={part} />);
}

function Part({ part }) {
  return (
    <p>
      {part.name} | exercises: {part.exercises}
    </p>
  );
}

function Total({ course }) {
  const totalExercises = course.parts.reduce(
    (acc, cur) => (acc += cur.exercises),
    0
  );
  return (
    <p>
      <strong>total of {totalExercises} exercises</strong>
    </p>
  );
}

export default Course;
