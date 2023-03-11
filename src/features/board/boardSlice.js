const initialState = [
    { id: 0, contents: 'Monica', visible: true, matched: true },
    { id: 1, contents: 'Monica', visible: true, matched: true },
    { id: 2, contents: 'Rachel', visible: true, matched: true },
    { id: 3, contents: 'Rachel', visible: true, matched: true },
    { id: 4, contents: 'Pheobe', visible: true, matched: true },
    { id: 5, contents: 'Pheobe', visible: true, matched: true },
    { id: 6, contents: 'Ross', visible: true, matched: true },
    { id: 7, contents: 'Ross', visible: true, matched: true },
    { id: 8, contents: 'Joey', visible: true, matched: true },
    { id: 9, contents: 'Joey', visible: true, matched: true },
    { id: 10, contents: 'Chandler', visible: true, matched: true },
    { id: 11, contents: 'Chandler', visible: true, matched: true },
];

export const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'board/setBoard':
            let setState = [];
            action.payload.forEach((element, index) =>
                setState.push({
                    id: index,
                    contents: element,
                    visible: false,
                    matched: false
                })
            );
            return setState;
        case 'board/flipCard':
            let flipState = [...state];
            const cardID = action.payload;
            flipState[cardID] = { ...state[cardID], visible: true }

            const [index1, index2] = flipState
                .filter(card => card.visible)
                .map(card => card.id);
            if (index2 !== undefined) {
                const card1 = flipState[index1];
                const card2 = flipState[index2];
                if (card1.contents === card2.contents) {
                    flipState[index1] = { ...card1, visible: false, matched: true }
                    flipState[index2] = { ...card2, visible: false, matched: true }
                }
            }
            return flipState;
        case 'board/resetCards':
            return state.map(card => ({ ...card, visible: false }));
        default:
            return state;
    }
}

const wordPairs = [
    'Monica', 'Monica',
    'Rachel', 'Rachel',
    'Pheobe', 'Pheobe',
    'Ross', 'Ross',
    'Joey', 'Joey',
    'Chandler', 'Chandler',
]

const randomWords = () => {
    let words = [];
    let newWordPairs = [...wordPairs];
    const reps = newWordPairs.length
    for (let i = 0; i < reps; i++) {
        const wordIndex = Math.floor(Math.random() * newWordPairs.length);
        words.push(newWordPairs[wordIndex]);
        newWordPairs.splice(wordIndex, 1);
    }

    return words;
}

// ***Action creators don’t dispatch actions but return the formatted action object with the appropriate payload.***

// creates a new randomized board
export const setBoard = () => {
    const words = randomWords()
    return {
        type: 'board/setBoard',
        payload: words
    }
}

// takes a card id as an argument and is used in dispatching the action that shows a card’s contents
export const flipCard = (id) => {
    return {
        type: 'board/flipCard',
        payload: id
    }
}

// resets the flipped cards
export const resetCards = () => {
    return {
        type: 'board/resetCards'
    }
}


// Selector export statments below

// creates the grid of cards
export const selectBoard = (state) => {
    return state.board.map(card => ({ id: card.id, contents: card.contents }));
}

// selects the visible card objects from the state data
export const selectVisibleIDs = (state) => {
    return state.board.filter(card => (card.visible === true)).map(card => (card.id));
}

// identify matched cards on the board using the matched property of each card object in the store
export const selectMatchedIDs = (state) => {
    return state.board.filter(card => (card.matched === true)).map(card => (card.id));
}