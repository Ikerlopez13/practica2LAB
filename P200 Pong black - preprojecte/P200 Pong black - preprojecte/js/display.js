class Display {
    constructor() {
        this.setupEvents();
    }

    setupEvents() {
        
        $(document).ready(() => {
            $("#jugar").on("click", () => {
                $("#menu").hide();
                $("#mjoc").show();
            });
        });
    }
}

const display = new Display();