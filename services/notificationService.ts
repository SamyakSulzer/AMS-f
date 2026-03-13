export interface NotificationCounts {
    incomplete_assets: number;
    incomplete_employees: number;
    expired_warranties: number;
    total: number;
}

export async function getNotificationCounts(userName: string): Promise<NotificationCounts> {
    try {
        const response = await fetch(`http://127.0.0.1:8001/notifications/counts?user_name=${encodeURIComponent(userName)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch notification counts: ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        console.error("Notification Service Error:", err);
        throw err;
    }
}

export interface NotificationDetails {
    incomplete_assets: string[];
    incomplete_employees: string[];
    expired_warranties: string[];
}

export async function getNotificationDetails(userName: string): Promise<NotificationDetails> {
    try {
        const response = await fetch(`http://127.0.0.1:8001/notifications/details?user_name=${encodeURIComponent(userName)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch notification details: ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        console.error("Notification Details Service Error:", err);
        throw err;
    }
}
