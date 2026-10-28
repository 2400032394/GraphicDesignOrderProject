package com.klef.soa.docker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.klef.soa.docker.entity.GraphicDesignOrder;
import com.klef.soa.docker.service.GraphicDesignOrderService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/graphicdesignorder")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:3000"
})
public class GraphicDesignOrderController
{
    @Autowired
    private GraphicDesignOrderService service;

    @GetMapping("/")
    public String test()
    {
        return "Graphic Design Order Management System";
    }

    // Add Graphic Design Order
    @PostMapping("/add")
    public ResponseEntity<GraphicDesignOrder> addGraphicDesignOrder(
            @Valid @RequestBody GraphicDesignOrder order)
    {
        GraphicDesignOrder savedOrder = service.addGraphicDesignOrder(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
    }

    // Display All Graphic Design Orders
    @GetMapping("/displayall")
    public ResponseEntity<List<GraphicDesignOrder>> displayAllGraphicDesignOrders()
    {
        List<GraphicDesignOrder> orders = service.displayAllGraphicDesignOrders();
        return ResponseEntity.ok(orders);
    }

    // Display Graphic Design Order By ID
    @GetMapping("/display")
    public ResponseEntity<?> displayGraphicDesignOrderById(@RequestParam Long id)
    {
        GraphicDesignOrder order = service.displayGraphicDesignOrderById(id);

        if (order != null)
        {
            return ResponseEntity.ok(order);
        }
        else
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Graphic Design Order ID Not Found");
        }
    }

    // Update Graphic Design Order
    @PutMapping("/update")
    public ResponseEntity<?> updateGraphicDesignOrder(
            @Valid @RequestBody GraphicDesignOrder order)
    {
        if (order.getId() == null)
        {
            return ResponseEntity.badRequest().body("Order ID is required for updating");
        }

        GraphicDesignOrder updatedOrder = service.updateGraphicDesignOrder(order);

        if (updatedOrder != null)
        {
            return ResponseEntity.ok(updatedOrder);
        }
        else
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Graphic Design Order ID Not Found");
        }
    }

    // Delete Graphic Design Order By ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteGraphicDesignOrderById(@PathVariable Long id)
    {
        String message = service.deleteGraphicDesignOrderById(id);

        if ("Graphic Design Order ID Not Found".equals(message))
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
        }

        return ResponseEntity.ok(message);
    }
}