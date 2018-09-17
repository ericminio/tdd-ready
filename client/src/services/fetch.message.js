export default async function() {
    const response = await fetch('/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.error);

    return body;
}
