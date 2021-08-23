export default {
  modules: {
    normal: {
      toolbar: [
        [{ 'size': [] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }, { 'align': [] }],
        ['link'],
        ['clean']
      ]
    },
    slim: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'indent': '-1' }, { 'indent': '+1' }, { 'align': [] }],
        ['clean']
      ]
    }
  }
};
