export const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString();
};
