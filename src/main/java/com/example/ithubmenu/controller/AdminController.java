package com.example.ithubmenu.controller;

import com.example.ithubmenu.model.DishDto;
import com.example.ithubmenu.service.DishService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class AdminController {

    private final DishService dishService;

    public AdminController(DishService dishService) {
        this.dishService = dishService;
    }

    @GetMapping("/admin")
    public String adminPage(Model model) {
        model.addAttribute("dishes", dishService.getAllDishes());
        return "admin";
    }

    @GetMapping("/admin/add")
    public String addDishForm(Model model) {
        model.addAttribute("dish", new DishDto());
        return "dish-form";
    }

    @GetMapping("/admin/edit/{id}")
    public String editDishForm(@PathVariable Long id, Model model) {
        model.addAttribute("dish", dishService.getDishById(id));
        return "dish-form";
    }

    @PostMapping("/admin/save")
    public String saveDish(@ModelAttribute("dish") DishDto dishDto) {
        dishService.saveDish(dishDto);
        return "redirect:/admin";
    }

    @GetMapping("/admin/delete/{id}")
    public String deleteDish(@PathVariable Long id) {
        dishService.deleteDish(id);
        return "redirect:/admin";
    }
}
