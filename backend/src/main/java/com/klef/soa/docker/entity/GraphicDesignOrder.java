package com.klef.soa.docker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "graphic_design_order")
public class GraphicDesignOrder
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Client name is required")
    @Size(max = 100, message = "Client name cannot exceed 100 characters")
    @Column(nullable = false, length = 100)
    private String clientName;

    @NotBlank(message = "Design type is required")
    @Size(max = 100, message = "Design type cannot exceed 100 characters")
    @Column(nullable = false, length = 100)
    private String designType;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Price must be greater than zero")
    @Column(nullable = false)
    private Double price;

    @NotNull(message = "Approval status is required")
    @Column(nullable = false)
    private Boolean approved;

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public String getClientName()
    {
        return clientName;
    }

    public void setClientName(String clientName)
    {
        this.clientName = clientName;
    }

    public String getDesignType()
    {
        return designType;
    }

    public void setDesignType(String designType)
    {
        this.designType = designType;
    }

    public Double getPrice()
    {
        return price;
    }

    public void setPrice(Double price)
    {
        this.price = price;
    }

    public Boolean getApproved()
    {
        return approved;
    }

    public void setApproved(Boolean approved)
    {
        this.approved = approved;
    }

    @Override
    public String toString()
    {
        return "GraphicDesignOrder [id=" + id
                + ", clientName=" + clientName
                + ", designType=" + designType
                + ", price=" + price
                + ", approved=" + approved + "]";
    }
}