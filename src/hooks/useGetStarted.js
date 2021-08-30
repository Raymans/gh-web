const isBrowser = typeof window !== 'undefined';
let _useLocalStorage = () =>
  [{},
    () => {
    },
    () => {
    }
  ];

if (isBrowser) {
  // cannot upgrade local-storage version because of waiting https://github.com/rehooks/local-storage/issues/77 been fixed.
  const { useLocalStorage } = require('@rehooks/local-storage');
  _useLocalStorage = useLocalStorage;
}


const useGetStarted = () => {
  const [tokens, setTokens, removeTokens] = _useLocalStorage('gs-guest-token');
  const [step, setStep, removeStep] = _useLocalStorage('gs-progress');
  const [assessmentId, setAssessmentId, removeAssessmentId] = _useLocalStorage('gs-assessment-id');
  const [assessmentSessionId, setAssessmentSessionId, removeAssessmentSessionId] = _useLocalStorage('gs-assessment-session-id');
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
