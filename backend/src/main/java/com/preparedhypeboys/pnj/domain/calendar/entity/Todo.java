package com.preparedhypeboys.pnj.domain.calendar.entity;

import com.preparedhypeboys.pnj.domain.member.entity.Member;
import com.preparedhypeboys.pnj.global.entity.BaseEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "TODOS")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Todo extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TODO_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Column(name = "SUMMARY")
    private String summary;

    @Builder
    public Todo(Long id, Member member, String summary) {
        this.id = id;
        this.member = member;
        this.summary = summary;
    }

    public void modifySummary(String summary) {
        this.summary = summary;
    }
}
