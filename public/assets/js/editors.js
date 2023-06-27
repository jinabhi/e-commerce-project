"use strict";

!(function (NioApp, $) {
  "use strict"; // SummerNote Init @v1.0

  NioApp.SummerNote = function () {
    var _basic = ".summernote-basic";

    if ($(_basic).exists()) {
      $(_basic).each(function () {
        $(this).summernote({
          inheritPlaceholder: true,
          // placeholder: "Hello stand alone ui",
          tabsize: 2,
          height: 250,
          toolbar: [
            ["style", ["style"]],
            ["font", ["bold", "underline", "strikethrough", "clear"]],
            ["font", ["superscript", "subscript"]],
            ["color", ["color"]],
            ["fontsize", ["fontsize", "height"]],
            ["para", ["ul", "ol", "paragraph"]],
            ["table", ["table"]],
            ["insert", ["link", "picture", "video"]],
            ["view", ["fullscreen", "codeview", "help"]],
          ],
        });
      });
    }
  }; // Tinymce Init @v1.0

  NioApp.EditorInit = function () {
    NioApp.SummerNote();
  };

  NioApp.coms.docReady.push(NioApp.EditorInit);
})(NioApp, jQuery);
