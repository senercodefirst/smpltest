self.addEventListener('push', event => {
    const data = event.data.json();
    console.log('Push received:', data);

    const options = {
        title: data.title,
        body: data.body,
        icon: data.icon,
        image: data.image,
        data: {
            url: data.data.url
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('activate', event => {
    console.log('Service Worker activated');
    return self.clients.claim();
});

self.addEventListener('notificationclick', event => {
    console.log('Notification clicked:', event.notification);
    const urlToOpen = event.notification.data.url;
    const promiseChain = clients.openWindow(urlToOpen);
    event.notification.close();
    event.waitUntil(promiseChain);
});