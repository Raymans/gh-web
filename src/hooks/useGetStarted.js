import useLocalStorage from './useLocalStorage';

const isBrowser = typeof window !== 'undefined';

const useGetStarted = () => {
  const [tokens, setTokens, removeTokens] = useLocalStorage('gs-guest-token');
  const [step, setStep, removeStep] = useLocalStorage('gs-progress');
  const [assessmentId, setAssessmentId, removeAssessmentId] = useLocalStorage('gs-assessment-id');
  const [assessmentSessionId, setAssessmentSessionId, removeAssessmentSessionId] = useLocalStorage('gs-assessment-session-id');
  return {
    gsTokens: tokens,
    isTokenValid: !!tokens,
    setTokens: (tokens) => {
      setTokens(tokens);
    },
    removeTokens,
    step: step ?? 0,
    setStep: (step) => {
      setStep(step);
    },
    removeStep,
    assessmentId,
    setAssessmentId: (id) => {
      setAssessmentId(id);
    },
    removeAssessmentId,
    assessmentSessionId,
    setAssessmentSessionId: (id) => {
      setAssessmentSessionId(id);
    },
    removeAssessmentSessionId,
    isGetStarted: isBrowser && location?.pathname.indexOf('/get-started') !== -1,
    clearGSTokens: () => {
      setStep(0);
      removeTokens();
      removeAssessmentId();
      removeAssessmentSessionId();
    }
  };
};

export default useGetStarted;
