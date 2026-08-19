package main

import (
	"context"
	"fmt"
	"log"

	"os"
	"path/filepath"

	"TarotOracleApp/backend/tarot"
)

// App структура Wails приложения.
type App struct {
	ctx context.Context

	service *tarot.TarotService
}

// NewApp создаёт приложение.
func NewApp() *App {

	return &App{}

}

// startup вызывается при запуске Wails.
func (a *App) startup(
	ctx context.Context,
) {

	a.ctx = ctx

	// Загружаем колоду

	deck, err :=
		tarot.LoadDeckFolder(
			"assets/tarot",
		)

	if err != nil {

		log.Fatal(
			"Ошибка загрузки колоды:",
			err,
		)

	}

	// SQLite

	dbPath, err := getDatabasePath()

	if err != nil {

		log.Fatal(
			"Ошибка определения пути к базе:",
			err,
		)

	}

	storage, err :=
		tarot.NewSQLiteStorage(
			dbPath,
		)

	if err != nil {

		log.Fatal(
			"Ошибка SQLite:",
			err,
		)

	}

	// Сервис

	a.service =
		tarot.NewTarotService(
			deck,
			"assets/tarot",
			storage,
		)

	log.Println(
		"Tarot Oracle запущен",
	)

}

// =====================================
// Колода
// =====================================

func (a *App) Shuffle() string {

	return a.service.Shuffle()

}

func (a *App) ResetDeck() string {

	return a.service.ResetDeck()

}

func (a *App) RemainingCards() int {

	return a.service.RemainingCards()

}

// =====================================
// Карты
// =====================================

func (a *App) DrawCard() (
	*tarot.DrawnCard,
	error,
) {

	return a.service.DrawCard()

}

func (a *App) DrawCards(
	count int,
) ([]tarot.DrawnCard, error) {

	return a.service.DrawCards(
		count,
	)

}

// =====================================
// Карта дня
// =====================================

func (a *App) GetDailyCard() (
	*tarot.DailyCard,
	error,
) {

	return a.service.GetDailyCard()

}

func (a *App) ResetDailyCard() {

	a.service.ResetDailyCard()

}

func (a *App) GetDailyAnimation() *tarot.DailyAnimation {

	return a.service.GetDailyAnimation()

}

// =====================================
// Расклады
// =====================================

// GetSpreads список всех раскладов.
func (a *App) GetSpreads() []tarot.Spread {

	return a.service.GetSpreads()

}

// DrawSpread универсальный расклад.
func (a *App) DrawSpread(
	spreadID string,
	question string,
) (*tarot.SpreadResult, error) {

	return a.service.DrawSpread(
		spreadID,
		question,
	)

}

// Последний расклад.
func (a *App) LastSpread() *tarot.Spread {

	return a.service.LastSpread()

}

// =====================================
// История
// =====================================

func (a *App) GetHistory() []tarot.HistoryRecord {

	return a.service.GetHistory()

}

func (a *App) GetLastHistory(
	count int,
) []tarot.HistoryRecord {

	return a.service.GetLastHistory(
		count,
	)

}

func (a *App) DeleteHistoryRecord(
	id int) {

	a.service.DeleteHistoryRecord(id)

}

func (a *App) ClearHistory() {

	a.service.ClearHistory()

}

func (a *App) HistoryCount() int {

	return a.service.HistoryCount()

}

// =====================================
// Информация
// =====================================

func (a *App) Today() string {

	return a.service.Today()

}

func (a *App) Status() map[string]interface{} {

	if a.service == nil {

		return map[string]interface{}{

			"status": "not initialized",
		}

	}

	return a.service.Status()

}

// Тест Wails
func (a *App) Greet(
	name string,
) string {

	return fmt.Sprintf(
		"Hello %s, Tarot Oracle ready!",
		name,
	)

}

func (a *App) GetQuestions() []tarot.QuestionCategory {

	return a.service.GetQuestions()

}

func (a *App) GetSettings() map[string]string {

	return a.service.GetSettings()

}

func (a *App) UpdateSetting(
	key string,
	value string,
) {

	a.service.UpdateSetting(key, value)

}

func (a *App) RemainingCardsList() []tarot.Card {

	return a.service.RemainingCardsList()

}

func (a *App) FullDeck() []tarot.Card {

	return a.service.FullDeck()

}

func (a *App) GetGuide() []tarot.GuideSection {

	return a.service.GetGuide()

}

func (a *App) GetLegal() *tarot.LegalDocs {

	return a.service.GetLegal()

}

func (a *App) UpdateHistoryComment(
	id int,
	comment string,
) {

	a.service.UpdateHistoryComment(id, comment)

}

func (a *App) GetAboutTarot() []tarot.GuideSection {

	return a.service.GetAboutTarot()

}

// getDatabasePath возвращает единый путь к базе данных
// в домашней папке пользователя — одинаковый независимо
// от того, откуда запущено приложение (dev или собранное).
func getDatabasePath() (string, error) {

	home, err :=
		os.UserHomeDir()

	if err != nil {

		return "", err

	}

	dir :=
		filepath.Join(
			home,
			".local",
			"share",
			"tarot-oracle",
		)

	err =
		os.MkdirAll(
			dir,
			0755,
		)

	if err != nil {

		return "", err

	}

	return filepath.Join(
		dir,
		"tarot.db",
	), nil

}
