class SCORM_API {
    constructor() {
        this.API = this.findAPI();
        this.initialized = false;
    }
    
    findAPI(win) {
        win = win || window;
        if (win.API) return win.API;
        if (win.parent && win.parent != win) return this.findAPI(win.parent);
        return null;
    }
    
    initialize() {
        if (this.API && !this.initialized) {
            this.API.LMSInitialize("");
            this.initialized = true;
            console.log('SCORM inicializado');
        }
    }
    
    setStatus(status) {
        if (this.API) {
            this.API.LMSSetValue("cmi.core.lesson_status", status);
            this.API.LMSCommit("");
            console.log('Status SCORM:', status);
        }
    }
    
    setScore(score) {
        if (this.API) {
            this.API.LMSSetValue("cmi.core.score.raw", score);
            this.API.LMSSetValue("cmi.core.score.min", 60);
            this.API.LMSCommit("");
            console.log('Nota SCORM:', score);
        }
    }
    
    completeCourse(score) {
        if (this.API) {
            const status = score >= 60 ? "passed" : "failed";
            
            this.setScore(score);
            this.setStatus(status);
            
            console.log('Curso finalizado:', { score, status });
        } else {
            console.log('SCORM não disponível - modo de teste');
            console.log('Nota que seria enviada:', score);
            console.log('Status que seria enviado:', score >= 60 ? 'passed' : 'failed');
        }
    }
}

const scorm = new SCORM_API();