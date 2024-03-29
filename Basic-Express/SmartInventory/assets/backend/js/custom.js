$(() => {
  $("body").on("click", "#btn_delete_category", (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Confirmed Delete ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        $("form#delete_category_form").submit();
      }
    });
  });

  $("body").on("click", "#btn_delete_product", function (e) {
    e.preventDefault();
    Swal.fire({
      title: "Confirmed Delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        $(this).closest("form#delete_product_form").submit();
      }
    });
  });
});
