class Display {
    constructor() {
        this.setupEvents();
        this.ready = false;
    }

    setupEvents() {

        $(document).ready(() => {
            $("#jugar").on("click", () => {
                this.ready = true;
                $("#menu").hide();
                $("#mjoc").show();
                
            });
        });
    }
}