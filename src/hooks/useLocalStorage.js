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

export default _useLocalStorage;
