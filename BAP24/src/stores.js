import { writable } from "svelte/store";
import { goto } from "$app/navigation";

export const toasts = writable([]);

export const addToast = (toast) => {
    const id = Math.floor(Math.random() * 5000);

    const defaults = {
        id,
        type: 'success',
        dismissible: true,
        timeout: 5000
    };

    toasts.update((all) => [{ ...defaults, ...toast}, ...all]);

    if (toast.timeout) setTimeout(() => dismissToast(id), toast.timeout);
}

export const dismissToast = (id) => {
    toasts.update((all) => all.filter(t => t.id !== id ));
}

export function timeDifference(start, end) {
    // Converteer ISO strings naar Date objecten
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Bereken het verschil in milliseconden
    const diff = endDate.getTime() - startDate.getTime();

    // Zet om in seconden, minuten en uren
    let sec = Math.floor(diff / 1000);
    let min = Math.floor(sec / 60);
    let hour = Math.floor(min / 60);

    sec = sec % 60;
    min = min % 60;

    // Formatteer de uitvoer
    const format = (num) => (num < 10 ? `0${num}` : num);

    return `${format(hour)}:${format(min)}:${format(sec)}`;
}

export const navigateTo = (path) => {
    goto(path);
}

export function makeDateReadable (date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const convertedDate = `${day}/${month}/${year}`;
    return convertedDate;
};

export function showDateAndTime (date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const hour = date.getHours();
    const minutes = date.getMinutes();

    const convertedDate = `${day}/${month}/${year} ${hour}:${minutes}`;
    return convertedDate;

}

export function howManyDaysLeft(deadline) {
    const now = new Date();
    const endDate = new Date(deadline);
    const difference = endDate.getTime() - now.getTime();
    const differenceDays = Math.ceil(difference / (1000 * 3600 * 24));
    if (differenceDays < 0) {
        return 'De deadline is verstreken';
    }
    return differenceDays;
}