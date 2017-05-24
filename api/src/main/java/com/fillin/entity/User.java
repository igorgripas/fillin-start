package com.fillin.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Table(name="users")
@Entity
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="users_user_id_seq")
    @SequenceGenerator(name="users_user_id_seq", sequenceName="users_user_id_seq", allocationSize=1)
    @Column(name = "user_id")
    private Long userId;

    private String email;
    private String salt;
    private String passwordHash;
}
