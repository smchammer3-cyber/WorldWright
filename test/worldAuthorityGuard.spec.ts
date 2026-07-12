import { describe, expect, it } from 'vitest';
import { createDefaultGeneratorParams, generateWorldFromParams } from '../src/core/worldGenerator';
import { runWithAuthorityGuard, AuthorityViolationError } from '../src/core/worldAuthority';

describe('C03 write-authority enforcement', () => {
  const makeWorld = () => generateWorldFromParams({ ...createDefaultGeneratorParams(), width: 32, height: 16, seed: 1040037 });

  it('allows a declared cause writer to modify only skeleton cause fields', () => {
    const world = makeWorld();
    const before = world.cells[0].continentality;
    const result = runWithAuthorityGuard(world, 'CONTINENT_FIELDS', (target) => {
      target.cells[0].continentality += 0.01;
    });
    expect(result.audit.passed).toBe(true);
    expect(result.audit.writes.map((write) => write.group)).toEqual(['skeletonCause']);
    expect(world.cells[0].continentality).toBeCloseTo(before + 0.01);
  });

  it('rejects diagnostic code that mutates canonical terrain without leaking the rejected write', () => {
    const world = makeWorld();
    const before = world.cells[0].baseHeight;
    expect(() => runWithAuthorityGuard(world, 'DIAGNOSTIC_REPLAY', (target) => {
      target.cells[0].baseHeight += 0.1;
    })).toThrow(AuthorityViolationError);
    expect(world.cells[0].baseHeight).toBe(before);
  });

  it('rejects renderer code that writes causal records', () => {
    const world = makeWorld();
    expect(() => runWithAuthorityGuard(world, 'FINAL_RENDER', (target) => {
      if (target.causal) target.causal.status = 'ACTIVE';
    })).toThrow(/causalRecord/);
    expect(world.causal?.status).toBe('EMPTY');
  });

  it('rejects recompute stages that rewrite upstream causes', () => {
    const world = makeWorld();
    const before = world.cells[0].crustThickness;
    expect(() => runWithAuthorityGuard(world, 'FIRST_RECOMPUTE', (target) => {
      target.cells[0].crustThickness += 0.01;
    })).toThrow(/crustCause/);
    expect(world.cells[0].crustThickness).toBe(before);
  });

  it('rejects cause-seed terrain writes with an actionable field name', () => {
    const world = makeWorld();
    const before = world.cells[0].baseHeight;
    expect(() => runWithAuthorityGuard(world, 'CONTINENT_FIELDS', (target) => {
      target.cells[0].baseHeight += 0.01;
    })).toThrow(/baseHeight/);
    expect(world.cells[0].baseHeight).toBe(before);
  });
});
