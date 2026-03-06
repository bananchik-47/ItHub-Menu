package com.example.ItHub_Menu.controller;

import com.example.ItHub_Menu.model.DishDto;
import com.example.ItHub_Menu.service.DishService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final DishService dishService;

    public AdminController(DishService dishService) {
        this.dishService = dishService;
    }

    @GetMapping
    public String getAdminPanel(Model model) {
        model.addAttribute("dishes", dishService.getAllDishes());
        return "admin";
    }

    @GetMapping("/add")
    public String showAddForm(Model model) {
        model.addAttribute("dish", new DishDto());
        return "dish-form";
    }

    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable Long id, Model model) {
        DishDto dishDto = dishService.getDishById(id);
        model.addAttribute("dish", dishDto);
        return "dish-form";
    }

    @PostMapping("/save")
    public String saveDish(@ModelAttribute DishDto dish) {
        dishService.saveDish(dish);
        return "redirect:/admin";
    }

    @GetMapping("/delete/{id}")
    public String deleteDish(@PathVariable Long id) {
        dishService.deleteDish(id);
        return "redirect:/admin";
    }
}
