package infrastructure

import (
	"bytes"
	"embed"
	"fmt"
	"html/template"
	"net/smtp"
)

//go:embed templates/verify_email.html
var emailTemplates embed.FS

func SendEmail(cfg AppConfig, to string, subject string, body string) error {
	addr := fmt.Sprintf("%s:%d", cfg.Email.Host, cfg.Email.Port)

	auth := smtp.PlainAuth("", cfg.Email.Username, cfg.Email.Password, cfg.Email.Host)

	header := fmt.Sprintf("To: %s\r\n"+
		"Subject: %s\r\n"+
		"MIME-Version: 1.0\r\n"+
		"Content-Type: text/html; charset=UTF-8\r\n"+
		"\r\n", to, subject)

	msg := []byte(header + body)

	err := smtp.SendMail(addr, auth, cfg.Email.Username, []string{to}, msg)
	if err != nil {
		return err
	}

	return nil
}

func ParseTemplate(code string) (string, error) {
	t, err := template.ParseFS(emailTemplates, "templates/verify_email.html")
	if err != nil {
		return "", err
	}

	var body bytes.Buffer

	//anonym struct with code field
	data := struct {
		Code string
	}{
		Code: code,
	}

	err = t.Execute(&body, data)
	if err != nil {
		return "", err
	}

	return body.String(), nil
}
