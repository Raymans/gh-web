const isBrowser = typeof window !== 'undefined';
let _useLocalStorage = () =>
  [{},
    () => {
    },
    () => {
    }
  ];

if (isBrowser) {
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
      try {
        setTokens(tokens);
      } catch (e) {
        // waiting https://github.com/rehooks/local-storage/issues/77 been fixed.
        console.log(e);
      }
    },
    removeTokens,
    step: step ?? 0,
    setStep: (step) => {
      try {
        setStep(step);
      } catch (e) {
        // waiting https://github.com/rehooks/local-storage/issues/77 been fixed.
        console.log(e);
      }
    },
    removeStep,
    assessmentId,
    setAssessmentId: (id) => {
      try {
        setAssessmentId(id);
      } catch (e) {
        // waiting https://github.com/rehooks/local-storage/issues/77 been fixed.
        console.log(e);
      }
    },
    removeAssessmentId,
    assessmentSessionId,
    setAssessmentSessionId: (id) => {
      try {
        setAssessmentSessionId(id);
      } catch (e) {
        // waiting https://github.com/rehooks/local-storage/issues/77 been fixed.
        console.log(e);
      }
    },
    removeAssessmentSessionId,
    isGetStarted: location?.pathname === '/get-started',
    clearGSTokens: () => {
      setStep(0);
      removeTokens();
      removeAssessmentId();
      removeAssessmentSessionId();

    }
  };
};

export default useGetStarted;
