package com.klef.soa.docker.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.soa.docker.entity.GraphicDesignOrder;
import com.klef.soa.docker.repository.GraphicDesignOrderRepository;
import com.klef.soa.docker.service.GraphicDesignOrderService;

@Service
public class GraphicDesignOrderServiceImpl implements GraphicDesignOrderService
{
    @Autowired
    private GraphicDesignOrderRepository repo;

    @Override
    public GraphicDesignOrder addGraphicDesignOrder(GraphicDesignOrder order)
    {
        return repo.save(order);
    }

    @Override
    public List<GraphicDesignOrder> displayAllGraphicDesignOrders()
    {
        return repo.findAll();
    }

    @Override
    public GraphicDesignOrder displayGraphicDesignOrderById(Long id)
    {
        return repo.findById(id).orElse(null);
    }

    @Override
    public GraphicDesignOrder updateGraphicDesignOrder(GraphicDesignOrder order)
    {
        Optional<GraphicDesignOrder> optional = repo.findById(order.getId());

        if (optional.isPresent())
        {
            GraphicDesignOrder existingOrder = optional.get();

            existingOrder.setClientName(order.getClientName());
            existingOrder.setDesignType(order.getDesignType());
            existingOrder.setPrice(order.getPrice());
            existingOrder.setApproved(order.getApproved());

            return repo.save(existingOrder);
        }
        else
        {
            return null;
        }
    }

    @Override
    public String deleteGraphicDesignOrderById(Long id)
    {
        boolean status = repo.existsById(id);

        if (status)
        {
            repo.deleteById(id);
            return "Graphic Design Order Deleted Successfully";
        }
        else
        {
            return "Graphic Design Order ID Not Found";
        }
    }
}