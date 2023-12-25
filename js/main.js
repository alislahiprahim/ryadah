function scroll_to_class(element_class, removed_height) {
    var scroll_to = $(element_class).offset().top - removed_height;
    if ($(window).scrollTop() != scroll_to) {
        $("html, body").stop().animate({ scrollTop: scroll_to }, 0);
    }
}

jQuery(document).ready(function() {
    const loader = document.querySelector(".loader");
    // Hide the loader once the content is fully loaded
    window.onload = function() {
        loader.style.display = "none";
    };

    // initialize hijri date picker
    // https://hijri-datepicker.azurewebsites.net/
    $(function() {
        const options = {
            hijri: true,
            showSwitcher: false,
        };
        $("#commpercialIdDate").hijriDatePicker(options);
        $("#qualifyDate").hijriDatePicker(options);
        $("#qualifyDate2").hijriDatePicker(options);
        $("#leaveWorkDate").hijriDatePicker(options);
    });

    // tabs

    $("#form-1 fieldset:first").fadeIn("fast");

    // forwards
    $("#form-1 #btn-next").on("click", function() {
        var current_active_step = $(this).parents("#form-1").find(".f1-step.active");
        var currentStep = $(this).closest("fieldset").data("step");
        var nextStep = parseInt(currentStep) + 1;
        var progress_line = $(this).parents("#form-1").find(".f1-progress-line");
        // Hide current step
        $(this)
            .closest("fieldset")
            .fadeOut(400, function() {
                updateProgress(progress_line, nextStep - 1);
                current_active_step
                    .removeClass("active")
                    .addClass("activated")
                    .next()
                    .addClass("active");
                $(`#form-1 fieldset[data-step="${nextStep}"]`).fadeIn("fast");
                scroll_to_class($("#form-1"), 20);
            });
    });

    // backwards
    $("#form-1 .btn-previous").on("click", function() {
        var current_active_step = $(this).parents("#form-1").find(".f1-step.active");
        var currentStep = $(this).closest("fieldset").data("step");
        var prevStep = parseInt(currentStep) - 1;
        var progress_line = $(this).parents("#form-1").find(".f1-progress-line");

        // Hide current step
        $(this)
            .closest("fieldset")
            .fadeOut(400, function() {
                updateProgress(progress_line, prevStep - 1);
                current_active_step.removeClass("active").prev().addClass("active");
                $(`#form-1 fieldset[data-step="${prevStep}"]`).fadeIn("fast");
                scroll_to_class($("#form-1"), 20);
            });
    });

    // steps navigation
    $("#form-1 .f1-step").on("click", function() {
        var progress_line = $(this).parents("#form-1").find(".f1-progress-line");
        var targetStep = $(this);
        var targetStepIndex = $(this).index();

        // Fade out all steps except the target step
        $("#form-1 fieldset").not(`[data-step="${targetStepIndex}"]`).fadeOut(400);

        $("#form-1 fieldset[data-step]")
            .promise()
            .done(function() {
                targetStep.prevAll(".f1-step").addClass("active");
                targetStep.nextAll(".f1-step").removeClass("active");
                targetStep.addClass("active");
                updateProgress(progress_line, targetStepIndex - 1);
                $(`#form-1 fieldset[data-step="${targetStepIndex}"]`).fadeIn("fast");
                scroll_to_class($("#form-1"), 20);
            });
    });

    // submit
    $("#form-1").on("submit", function(e) {
        // fields validation
        // $(this).find('input[type="text"], input[type="password"], textarea').each(function () {
        //     if ($(this).val() == "") {
        //         e.preventDefault();
        //         $(this).addClass('input-error');
        //     }
        //     else {
        //         $(this).removeClass('input-error');
        //     }
        // });
        // fields validation
    });

    // progress bar updates
    function updateProgress(progress_line, stepNumber) {
        var ratio = progress_line.data("ratio");
        progress_line
            .attr("style", "width: " + ratio * stepNumber + "%;")
            .data("ratio", ratio);
    }

    // request details set nav tab name
    if($("#v-pills-tab").length){
        $("#tab-name").text($('#v-pills-tab li.nav-link').data('tab-label'));
        $('#v-pills-tab li.nav-link').on('click', function () {
            // Get the value of the 'data-tab-label' attribute
            $("#tab-name").text($(this).data('tab-label'));
          });
     }
});