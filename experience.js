const baseUrl = `https://intra.epitech.eu`;

const requestGet = async (url) => {
    let data;

    try {
        const res = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        });
        data = await res.json();
    } catch (e) {
        console.log(e);
        throw 'Invalid request';
    }
    return data;
};

const getProfil = async () => {
    return await requestGet(`${baseUrl}/user/?format=json`);
};

const getNotes = async (login) => {
    return await requestGet(`${baseUrl}/user/${login}/notes?format=json`);
};

const insertAfter = (newNode, referenceNode) => {
    if (referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
};

const findElemByText = (tag, text, xpathType) => {
    const node = document.evaluate(`//${tag}[text()="${text}"]`, document, null, xpathType, null);
    return node;
};

const calcGPA = async () => {
    const profil = await getProfil()
    const notes = await getNotes(profil.login);

    let totalCredits = 0;
    let totalPoints = 0;
    for (const module of notes.modules) {
        if (module.credits > 100)
            continue;
        switch (module.grade) {
            case "A":
                totalPoints += 4 * module.credits;
                break;
            case "B":
                totalPoints += 3 * module.credits;
                break;
            case "C":
                totalPoints += 2 * module.credits;
                break;
            case "D":
                totalPoints += 1 * module.credits;
                break;
        }
        if (module.grade.match(/(A|B|C|D|Echec)$/))
            totalCredits += module.credits;
    }
    neartag.innerHTML = (totalPoints / totalCredits).toFixed(2)
}

const gpatag = findElemByText('label', 'G.P.A.', XPathResult.FIRST_ORDERED_NODE_TYPE)?.singleNodeValue;
gpatag.innerHTML = "G.P.A. (Cheh Jordan)"
const neartag = findElemByText('span', '0.00', XPathResult.FIRST_ORDERED_NODE_TYPE)?.singleNodeValue;

calcGPA();