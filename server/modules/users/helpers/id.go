package helpers

import (
	"crypto/rand"
	"errors"
	"math"
	"math/big"
)

const base62Alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

func GenerateUniqueID(length int) (string, error) {
	if length <= 0 {
		return "", errors.New("length must be > 0")
	}
	bitsNeeded := float64(length) * math.Log2(62.0)
	bytesNeeded := int(math.Ceil(bitsNeeded / 8.0))

	randomBytes := make([]byte, bytesNeeded)
	if _, err := rand.Read(randomBytes); err != nil {
		return "", err
	}

	n := big.NewInt(0).SetBytes(randomBytes)
	alphabet := base62Alphabet
	base := big.NewInt(int64(len(alphabet)))
	chars := make([]byte, 0, length)

	zero := big.NewInt(0)
	for len(chars) < length {
		if n.Cmp(zero) == 0 {
			if _, err := rand.Read(randomBytes); err != nil {
				return "", err
			}
			n.SetBytes(randomBytes)
		}
		mod := big.NewInt(0)
		n.DivMod(n, base, mod)
		chars = append(chars, alphabet[mod.Int64()])
	}

	for i, j := 0, len(chars)-1; i < j; i, j = i+1, j-1 {
		chars[i], chars[j] = chars[j], chars[i]
	}
	return string(chars), nil
}
