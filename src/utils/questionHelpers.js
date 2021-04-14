export default function transformSwitchValue(switchValues = []) {
  return switchValues.map((switchValue) => {
    const correct = !!switchValue.correctAnswer;
    return {
      ...switchValue,
      correctAnswer: correct
    };
  });
}
