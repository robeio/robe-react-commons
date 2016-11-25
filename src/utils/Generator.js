class Generator {
    s4 = (): Object => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    guid = (): Object => {
        let s = this.s4;
        return `${s()}${s()}-${s()}-${s()}-${s()}-${s()}${s()}${s()}`;
    }
}

export default new Generator();
