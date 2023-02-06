package com.dbd.nanal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Collections;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@Table(name = "user_profile")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int profileId;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_idx", columnDefinition = "INT UNSIGNED")
    @JsonIgnore
    private UserEntity user;

    @Column(name = "nickname", unique = true)
    private String nickname;

    @Column
    private String img;

    @Column
    private String introduction;

    @Column(name = "is_private")
    private Boolean isPrivate;

}
