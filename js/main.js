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

    // request details set nav tab name
    if ($("#v-pills-tab").length) {
        $("#tab-name").text($("#v-pills-tab li.nav-link").data("tab-label"));
        $("#v-pills-tab li.nav-link").on("click", function() {
            // Get the value of the 'data-tab-label' attribute
            $("#tab-name").text($(this).data("tab-label"));
        });
    }
});

function moveToStep(stepperId, targetStepNumber) {
    const form = $(`#${stepperId}`);
    const progressLine = form.find(".f1-progress-line");
    const currentStep = form.find(`fieldset[data-step]:visible`).data("step");

    if (targetStepNumber !== currentStep) {
        const targetFieldset = form.find(
            `fieldset[data-step="${targetStepNumber}"]`
        );
        const currentFieldset = form.find(`fieldset[data-step="${currentStep}"]`);

        currentFieldset.fadeOut(400, function() {
            updateProgress(progressLine, targetStepNumber - 1);
            form.find(`.${stepperId}-step.active`).removeClass("active");
            form
                .find(`.${stepperId}-step`)
                .eq(targetStepNumber - 1)
                .addClass("active");
            targetFieldset.fadeIn("fast");
            scroll_to_class(form, 20);
        });
    }
}

function initializeStepper(stepperId) {
    const form = $(`#${stepperId}`);
    const progressLine = form.find(".f1-progress-line");

    form.find("fieldset:first").fadeIn("fast");

    form.find(".btn-next").on("click", function() {
        const currentFieldset = $(this).closest("fieldset");
        const currentStep = currentFieldset.data("step");
        const nextStep = currentStep + 1;

        currentFieldset.fadeOut(400, function() {
            updateProgress(progressLine, nextStep - 1);
            $(`.${stepperId}-step.active`)
                .removeClass("active")
                .next()
                .addClass("active");
            $(`fieldset[data-step="${nextStep}"]`).fadeIn("fast");
            scroll_to_class(form, 20);
        });
    });

    form.find(".btn-previous").on("click", function() {
        const currentFieldset = $(this).closest("fieldset");
        const currentStep = currentFieldset.data("step");
        const prevStep = currentStep - 1;

        currentFieldset.fadeOut(400, function() {
            updateProgress(progressLine, prevStep - 1);
            $(`.${stepperId}-step.active`)
                .removeClass("active")
                .prev()
                .addClass("active");
            $(`fieldset[data-step="${prevStep}"]`).fadeIn("fast");
            scroll_to_class(form, 20);
        });
    });

    form.find(".f1-step").on("click", function() {
        const targetStep = $(this);
        const targetStepIndex = targetStep.index();

        form.find("fieldset").not(`[data-step="${targetStepIndex}"]`).fadeOut(400);

        form
            .find("fieldset[data-step]")
            .promise()
            .done(function() {
                targetStep.prevAll(".f1-step").addClass("active");
                targetStep.nextAll(".f1-step").removeClass("active");
                targetStep.addClass("active");
                updateProgress(progressLine, targetStepIndex - 1);
                $(`fieldset[data-step="${targetStepIndex}"]`).fadeIn("fast");
                scroll_to_class(form, 20);
            });
    });
}

function updateProgress(progressLine, stepNumber) {
    const ratio = progressLine.data("ratio");
    progressLine
        .attr("style", `width: ${ratio * stepNumber}%;`)
        .data("ratio", ratio);
}

initializeStepper("form-1");
// moveToStep("form-1", 3);