class OperationResult extends HJsBase {

    isSuccessful = true;
    reason = null;
    comments = null;

    static win(payload, reason, comments) {
        return new OperationResult()
            .and(x => x.isSuccessful = true)
            .and(x => x.reason = reason || null)
            .and(x => x.comments = comments || null)
            ;
    }
}