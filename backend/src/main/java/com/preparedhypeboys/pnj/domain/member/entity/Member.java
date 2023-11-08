package com.preparedhypeboys.pnj.domain.member.entity;

import com.preparedhypeboys.pnj.global.entity.BaseEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "MEMBER")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMBER_ID")
    private Long id;

    private String email;

    private String name;

    private String uuid;

    private String accessToken;

    private String refreshToken;

    @Builder
    public Member(Long id, String email, String name, String uuid, String accessToken,
        String refreshToken) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.uuid = uuid;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public void setToken(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public void refreshExpiredToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
