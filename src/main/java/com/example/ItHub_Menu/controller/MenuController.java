package com.example.ItHub_Menu.controller;

import com.example.ItHub_Menu.model.DishDto;
import com.example.ItHub_Menu.service.DishService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.annotation.PostConstruct;
import java.util.List;

@Controller
public class MenuController {

    private final DishService dishService;

    public MenuController(DishService dishService) {
        this.dishService = dishService;
    }

    // Удалили метод init, так как инициализация тестовых данных теперь происходит в сервисе

    @GetMapping("/")
    public String getHomePage(Model model) {
        model.addAttribute("dishes", dishService.getAllDishes());
        return "menu";
    }
    
    @GetMapping("/menu")
    public String getMenu(Model model) {
        model.addAttribute("dishes", dishService.getAllDishes());
        return "menu";
    }
    
    @GetMapping("/login")
    public String login() {
        return "login";
    }
}
