$(document).ready(function() {
  
  $('.rte').summernote({
    height: 500,
    airMode: true,
    placeholder: "Input your thinking...",
    fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Palanquin Dark', 'Source Sans Pro'],
    fontNamesIgnoreCheck: ['Palanquin Dark', 'Source Sans Pro'],
    fontSize: 20,
    styleTags: ['h1', 'h2', 'p', 'quote'],
    popover: {
        air: [
          ['style', ['style', 'fontname','bold', 'italic', 'underline', 'clear']],
          ['fontsize', ['fontsize']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['height', ['height']],
        ]
    }
  });
});
