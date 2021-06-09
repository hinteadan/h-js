(function (hjs) {

    /**
     * 
     * @param {{ dispose() }} disposable
     * @param {Function} stuffToDo
     */
    hjs.using = async (disposable, stuffToDo) => {

        try {

            await Promise.resolve(stuffToDo());
        }
        catch (ex) { console.error(ex); }
        finally {
            try { disposable.dispose(); } catch (ex) { console.error(ex); }
        }

    };

})(window);