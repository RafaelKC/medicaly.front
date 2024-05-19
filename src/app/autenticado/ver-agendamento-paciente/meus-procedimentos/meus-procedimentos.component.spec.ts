import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusProcedimentosComponent } from './meus-procedimentos.component';

describe('MeusProcedimentosComponent', () => {
  let component: MeusProcedimentosComponent;
  let fixture: ComponentFixture<MeusProcedimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeusProcedimentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeusProcedimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
