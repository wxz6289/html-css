function fact(n){
    if (this.store && this.store[n]){
        return this.store[n]
    } else {
        if(n <= 1){
            return 1;
        } else {
            let result = 1;
            if (!this.store) {
                this.store = {};
            }
            result = n * fact(n - 1)
            this.store[n] = result;
            return result;
        }  
    }
}


self.addEventListener("message", (e) => {
    console.log("work:", e);
    let result = fact(e.data);
    self.postMessage(result);
    self.close();
});
