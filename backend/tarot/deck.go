package tarot

import (
	"math/rand"
	"time"
)

// Вероятность выпадения перевернутой карты (%)
const ReverseProbability = 35

// Deck представляет колоду Таро.
type Deck struct {
	cards    []Card
	original []Card
	rnd      *rand.Rand
}

// NewDeck создает новую колоду.
func NewDeck(cards []Card) *Deck {

	deck := &Deck{
		cards:    make([]Card, len(cards)),
		original: make([]Card, len(cards)),
		rnd: rand.New(
			rand.NewSource(
				time.Now().UnixNano(),
			),
		),
	}

	copy(deck.cards, cards)
	copy(deck.original, cards)

	// Сразу перемешиваем новую колоду
	deck.Shuffle()

	return deck
}

// Shuffle перемешивает оставшиеся карты.
func (d *Deck) Shuffle() {

	d.rnd.Shuffle(
		len(d.cards),
		func(i, j int) {
			d.cards[i], d.cards[j] =
				d.cards[j], d.cards[i]
		},
	)
}

// Draw вытягивает count карт из колоды.
func (d *Deck) Draw(count int) []DrawnCard {

	if count <= 0 || len(d.cards) == 0 {
		return nil
	}

	if count > len(d.cards) {
		count = len(d.cards)
	}

	result := make([]DrawnCard, 0, count)

	for i := 0; i < count; i++ {

		card := d.cards[0]

		// Удаляем карту из колоды
		d.cards = d.cards[1:]

		isReversed :=
			d.rnd.Intn(100) < ReverseProbability

		result = append(result, DrawnCard{

			Card: card,

			IsReversed: isReversed,

			QuickAnswer: GetQuickAnswer(
				card.ID,
				isReversed,
			),
		})
	}

	return result
}

// Reset полностью восстанавливает колоду
// и автоматически перемешивает её.
func (d *Deck) Reset() {

	d.cards = make([]Card, len(d.original))

	copy(
		d.cards,
		d.original,
	)

	d.Shuffle()
}

// Remaining возвращает количество
// оставшихся карт.
func (d *Deck) Remaining() int {
	return len(d.cards)
}

// Total возвращает полный размер колоды.
func (d *Deck) Total() int {
	return len(d.original)
}

// IsEmpty сообщает,
// закончилась ли колода.
func (d *Deck) IsEmpty() bool {
	return len(d.cards) == 0
}

// Cards возвращает копию оставшихся карт.
// Внешний код не сможет изменить колоду.
func (d *Deck) Cards() []Card {

	result := make([]Card, len(d.cards))

	copy(result, d.cards)

	return result
}

// OriginalCards возвращает копию полного набора карт
// (независимо от того, сколько вытянуто).
func (d *Deck) OriginalCards() []Card {

	result := make([]Card, len(d.original))

	copy(result, d.original)

	return result
}
