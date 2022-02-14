export const date = (dateString) => {
    const date = new Date(dateString)
    date.setHours(date.getHours() + 1)
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    })
}