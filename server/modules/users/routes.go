package users

import (
	"github.com/labstack/echo/v4"
	"github.com/zshstacks/markdown-zsh/internal/infrastructure"
	"github.com/zshstacks/markdown-zsh/internal/middleware"
	"github.com/zshstacks/markdown-zsh/modules/users/controllers"
	"gorm.io/gorm"
)

func RegisterRoutes(e *echo.Echo, db *gorm.DB, cfg infrastructure.AppConfig) {

	authController := controllers.NewAuthController(db, cfg)

	public := e.Group("/")
	{
		public.POST("register", authController.Register)
		public.POST("login", authController.Login)
		public.POST("auth/refresh", authController.Refresh)
		public.POST("auth/refresh/logout", authController.Logout)
		public.POST("auth/verify-email", authController.VerifyEmail)
		public.POST("auth/resend-otp", authController.ResendOTP)
	}

	private := e.Group("/user")

	private.Use(middleware.RequireAuth(db, cfg))
	{
		private.GET("/current", authController.GetCurrentUser)
		private.DELETE("/current/delete", authController.DeleteUser)
	}
}
