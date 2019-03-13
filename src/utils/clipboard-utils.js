const fallbackCopyTextToClipboard = text => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (!successful) {
            throw new Error('failure');
        }
    } catch (err) {
        throw err;
    } finally {
        document.body.removeChild(textArea);
    }
};

export const copyTextToClipboard = (text, onSuccess, onError) => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(onSuccess, onError);
    } else {
        try {
            fallbackCopyTextToClipboard(text);
            onSuccess && onSuccess();
        } catch (e) {
            onError && onError(e);
        }
    }
};
