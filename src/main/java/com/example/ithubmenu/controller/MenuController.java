package com.example.ithubmenu.controller;

import com.example.ithubmenu.service.DishService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MenuController {

    private final DishService dishService;

    public MenuController(DishService dishService) {
        this.dishService = dishService;
    }

    @GetMapping("/menu")
    public String showMenu(Model model) {
        model.addAttribute("dishes", dishService.getAllDishes());
        return "menu";
    }
}
