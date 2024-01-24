import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExamQuestionsComponent } from './view-exam-questions.component';

describe('ViewExamQuestionsComponent', () => {
  let component: ViewExamQuestionsComponent;
  let fixture: ComponentFixture<ViewExamQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewExamQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewExamQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
