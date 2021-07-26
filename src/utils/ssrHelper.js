const isBrowser = typeof window !== 'undefined';

let useLocalStorage = () =>
  [{},
    () => {
    },
    () => {
    }
  ];

let aos = {};

if (isBrowser) {
  import('@rehooks/local-storage').then((module) => {
    useLocalStorage = module;
  });
  import('aos').then((module) => {
    aos = module;
  });
}

export { aos, useLocalStorage };
