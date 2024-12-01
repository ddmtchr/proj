package com.leti.project.security.repository;

import com.leti.project.security.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
    @Query(value = "select u from User u left join Employee e on e.user.id = u.id where e.id is null")
    List<User> findAllNotRegisteredUsers();
}
