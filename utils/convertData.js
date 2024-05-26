export function convertCreatedAt(createdAt){
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(Date.parse(createdAt));
    return formattedDate;
}