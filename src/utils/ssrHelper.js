const isBrowser = typeof window !== 'undefined';

let useLocalStorage = () =>
  [{},
    () => {
    },
    () => {
    }
  ];

let aos = {};

let ReactQuill = ()=> <></>;

if (isBrowser) {
  import('@rehooks/local-storage').then((module) => {
    useLocalStorage = module;
  });
  import('aos').then((module) => {
    aos = module;
  });
  import('react-quill').then((module) => {
    ReactQuill = module.default;
  });
}

export { aos, useLocalStorage, ReactQuill };
